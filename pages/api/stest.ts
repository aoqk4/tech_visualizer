// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name?: String;
  err?: String | undefined;
  result?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch(
      `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${process.env.apikey}&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=3&orgId=441&tblId=DT_441001_001`
    )
      .then((res) => res.json())
      .then((json) => res.status(200).json({ result: json }));
  } catch (err) {
    console.log(err);
  }
}
