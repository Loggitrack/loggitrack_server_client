import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export default function ListView({
  className,
  data,
  title,
  headers,
}: {
  className: string;
  data: any[];
  title: string;
  headers: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle> {title} </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data &&
          data.map((item) => {
            return (
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{headers}</p>
                  <p className="text-sm text-muted-foreground">{item?._id}</p>
                </div>
                <div className="ml-auto font-medium"> {item?.count} </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
