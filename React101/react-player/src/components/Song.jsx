import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Chip from '@mui/joy/Chip';

export default function Song() {
  return (
    <Card orientation="horizontal" variant="soft" sx={{ width: '25%' }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 110 }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuXGMs0MU6xDdd1nuOa-BEaVjAEruRETbhcgI9580NLenw1MWe3flxj7IoZjJo8aj0ob4&usqp=CAU"
            srcSet="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuXGMs0MU6xDdd1nuOa-BEaVjAEruRETbhcgI9580NLenw1MWe3flxj7IoZjJo8aj0ob4&usqp=CAU&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography textColor="primary.plainColor" sx={{ fontWeight: "md" }}>
          Mocking Bird
        </Typography>
        <Typography level="body-sm" sx={{ fontWeight: "md", fontSize: "md" }}>Eminem</Typography>
        <div style={
          {
            display: "flex",
            gap: "8px"
          }
        }>
          <Typography level="body-sm" sx={{ fontWeight: "sm" }}>Duration: 5:20</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
