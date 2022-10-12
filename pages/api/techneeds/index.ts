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
        `http://211.188.64.69/OpenAPI/service/tech/needtech?ServiceKey=${process.env.ServiceKey}&numOfRows=12000`
      )
        .then((res) => res.text())
        .then((txt) => convert.xml2json(txt, { compact: true, spaces: 4 }))
        .then(async (json) => {
          let result = JSON.parse(json);

          let obj: object[] = [];

          result.response.body.items.item.map((ele: any, idx: any) => {
            let testobj = {
              buyKindNm: ele.buyKindNm?._text,
              keyword: ele.keyword?._text?.split(","),
              dmdtchNm: ele.dmdtchNm?._text,
              tchlgyIndcprDtl: ele.tchlgyIndcprDtl?._text,
              tchlgyPccndCn: ele.tchlgyPccndCn?._text,
              tpDmandCdNm: ele.tpDmandCdNm?._text,
              tcntrnFxamtTchfee: ele.tcntrnFxamtTchfee?._text,
              tcntrnOrdnrTchfee: ele.tcntrnOrdnrTchfee?._text,
            };
            obj.push(testobj);
          });
          const techneeds = await prisma.techNeeds.createMany({
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
      const tsearchData = await prisma.techNeeds.findMany({
        where: {
          keyword: {
            hasSome: "a",
          },
        },
        select: {
          tchlgyIndcprDtl: true,
          dmdtchNm: true,
          tpDmandCdNm: true,
        },
      });

      res.status(200).json({ result: tsearchData });
    } catch (err) {
      res.status(504).json({ err: `${err}` });
    } finally {
      prisma.$disconnect();
    }
  }
}
