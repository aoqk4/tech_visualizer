// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techMarketInfo } from "@prisma/client";

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
        `http://211.188.64.69/OpenAPI/service/tech/techallplus?ServiceKey=${process.env.ServiceKey}&numOfRows=14000`
      )
        .then((res) => res.text())
        .then((txt) => convert.xml2json(txt, { compact: true, spaces: 4 }))
        .then(async (json) => {
          let result = JSON.parse(json);

          let obj: any[] = [];

          let filterArr = result.response.body.items.item.filter(
            (ele: any, idx: any) => {
              if (
                ele?.kwrdDtl?._text === "., , , ," ||
                !ele?.kwrdDtl?._text ||
                !ele.tcateNames?._text
              ) {
                return false;
              } else {
                return true;
              }
            }
          );

          filterArr.map((ele: any) => {
            let testobj = {
              tcateNames: ele?.tcateNames?._text,
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
      const tsearchData2 = await prisma.techMarketInfo.findMany({
        where: {
          tcateNames: {
            contains: req.body,
          },
        },
      });

      res.status(200).json({ result: tsearchData2 });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
    }
  }
}
