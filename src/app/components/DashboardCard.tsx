// components/DashboardCard.js
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

const DashboardCard = ({ title, description, value, footer = null }) => {
  return (
    <Card className="w-full sm:w-auto">
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default DashboardCard;
