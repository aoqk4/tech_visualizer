// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name?: String;
  err?: String | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch(
      "http://211.188.64.69/OpenAPI/service/tech/needtech?ServiceKey=uNe2gNmclsaT0QRQZk%2B0hUBNl7RgIocrPhY%2B31DtAv5%2BWIH%2BmhcvnAfNVY8YiQATVcWq4byy6qNwGJBEUrvHRA%3D%3D&numOfRows=12000"
    )
      .then((res) => res.text())
      .then((txt) => convert.xml2json(txt, { compact: true, spaces: 4 }))
      .then(async (json) => {
        let result = JSON.parse(json);

        let obj: object[] = [];

        result.response.body.items.item.map((ele: any, idx: any) => {
          let testobj = {};
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
}
