"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@heroui/react";

const StatisticsCard = ({  icon, title, value, footer }) => {
  return (
    <div>
      <Card className="border border-blue-gray-100 bg-white shadow-sm rounded-md">
        <CardHeader
      
          className="absolute grid h-12 w-12 text-[25px] place-items-center bg-gray-300 text-white rounded-lg m-5"
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <h1 className="font-normal text-[17px] text-gray-600">{title}</h1>
          <p className="dark_color font-bold  text-[23px]">{value}</p>
        </CardBody>

        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatisticsCard;
