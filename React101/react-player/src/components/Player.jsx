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
import { useEffect } from "react";

export default function Player({ activeSong, prevSong, nextSong }) {
  const [currentTime, setCurrentTime] = React.useState(0);

  useEffect(() => {
    if (!activeSong) return;
    const audio = activeSong.audio;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
  
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    }
  }, [activeSong])

  const convertor = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return (minutes * 60) + seconds;
  }

  const maxDuration = activeSong ? convertor(activeSong.duration) : 0;

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
            {activeSong?.name ?? ''}
          </Typography>
          <Typography level="body-sm" sx={{ fontWeight: "sm", fontSize: "sm" }}>
            <span>{activeSong ? '-' : 'Pick a song from library'}</span>
          </Typography>
          <Typography level="body-sm" sx={{ fontWeight: "sm", fontSize: "sm" }}>
            {activeSong?.artist ?? ''}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "35px",
            justifyContent: "center",
          }}
        >
          <IconButton variant="soft" color="primary" onClick={() => prevSong()}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton variant="soft" color="primary">
            <PlayArrowIcon />
          </IconButton>
          <IconButton variant="soft" color="primary" onClick={() => nextSong()}>
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
          <Slider value={currentTime} max={maxDuration}/>
          <p>{activeSong?.duration ?? '0:00'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
