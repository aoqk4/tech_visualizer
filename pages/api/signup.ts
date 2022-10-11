// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds, user } from "@prisma/client";

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
  try {
    const wSearch = JSON.parse(req.body);

    if (req.method === "POST") {
      switch (wSearch.wreq) {
        case 1:
          const result = await prisma.user.findFirst({
            where: {
              email: wSearch.email,
            },
            select: {
              email: true,
            },
          });
          res.status(200).json({ result });
          break;
        case 2:
          const cUser = await prisma.user.create({
            data: {
              email: wSearch.email,
              password: wSearch.psd,
              name: wSearch.name?.toString() || " ",
            },
          });
          break;
      }
    } else {
      res.status(504).json({ err: "올바르지 않은 요청 형식" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
}
