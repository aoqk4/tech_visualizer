// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient } from "@prisma/client";

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
  const want: any | undefined = req.body?.toString();

  if (req.method === "GET") {
    try {
      fetch(
        `http://211.188.64.69/OpenAPI/service/tech/techallplus?ServiceKey=${process.env.ServiceKey}&numOfRows=14000`
      )
        .then((res) => res.text())
        .then((txt) => convert.xml2json(txt, { compact: true, spaces: 4 }))
        .then(async (json) => {
          let result = JSON.parse(json);

          let obj: object[] = [];

          // console.log(result.response.body.items.item[0]);

          result.response.body.items.item.map((ele: any, idx: any) => {
            let testobj = {
              devStatusName: ele?.devStatusName?._text || "",
              kwrdDtl: ele?.kwrdDtl?._text?.split(",") || "",
              slePc: ele?.slePc?._text || "",
              tcateNames: ele?.tcateNames?._text || "",
              indcateNames: ele?.indcateNames?._text || "",
            };
            obj.push(testobj);
          });
          const techMarketInfo = await prisma.techMarketInfo.createMany({
            data: obj,
          });
        });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
      res.status(200).json({ name: "John Doe" });
    }
  } else if (req.method === "POST") {
    try {
      const setData = await prisma.techMarketInfo.findMany({
        select: {
          tcateNames: true,
        },
        where: {
          kwrdDtl: {
            has: req.body,
          },
        },
      });

      res.status(200).json({ result: setData });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
    }
  }
}
