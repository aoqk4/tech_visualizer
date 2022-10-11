// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name?: String;
  err?: String | undefined;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      fetch(
        `http://apis.data.go.kr/B552540/KCIOpenApi/artiInfo/openApiM310KorKwdList?serviceKey=${process.env.ServiceKey}&recordCnt=58000&pageNo=1`
      )
        .then((res) => res.text())
        .then((txt) => convert.xml2json(txt, { compact: true, spaces: 4 }))
        .then(async (json) => {
          let result = JSON.parse(json);

          let obj: object[] = [];

          result.response.body.items.item.map((ele: any, idx: any) => {
            let testobj = {
              KOR_KWD: ele.KOR_KWD._text,
            };
            obj.push(testobj);
          });
          const kciData = await prisma.kciData.createMany({
            data: obj,
          });
        });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
      res.status(200).json({ name: "YES" });
    }
  } else if (req.method === "POST") {
    try {
      const tsearchData = await prisma.kciData.findMany({
        where: {
          KOR_KWD: {
            startsWith: "반도체",
          },
        },
        select: {
          KOR_KWD: true,
        },
      });

      console.log(tsearchData);

      res.status(200).json({ result: tsearchData });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
    }
  }
}
