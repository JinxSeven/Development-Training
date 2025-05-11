import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/joy/Slider";

export default function Player() {
  return (
    <Card orientation="horizontal" variant="soft" sx={{ width: "25%" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginBottom: "15px",
            justifyContent: "center",
          }}
        >
          <Typography
            textColor="primary.plainColor"
            sx={{ fontWeight: "md", fontSize: "sm" }}
          >
            Mocking Bird
          </Typography>
          <Typography level="body-sm" sx={{ fontWeight: "sm", fontSize: "sm" }}>
          <span>-</span> Eminem
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "35px",
            justifyContent: "center",
          }}
        >
          <IconButton variant="soft" color="primary">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton variant="soft" color="primary">
            <PlayArrowIcon />
          </IconButton>
          <IconButton variant="soft" color="primary">
            <SkipNextIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <p>0:00</p>
          <Slider />
          <p>5:20</p>
        </div>
      </CardContent>
    </Card>
  );
}
