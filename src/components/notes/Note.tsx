import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { COLORS, NoteInput } from "../../models/Note";

export default function Note({
  noteId,
  heading,
  content,
  color,
  dateCreated,
  onColorChange,
  onClick,
}: NoteInput) {
  const [selectedColor, setSelectedColor] = React.useState(color);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSelectedColor(event.target.value);
    onColorChange(event.target.value);
  };

  const fontColor = (colorIndex: string) => {
    return colorIndex === "1" || colorIndex === "3" ? "white" : "black";
  };

  const controlProps = (item: string) => ({
    checked: selectedColor === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button",
    size: "small" as const,
    inputProps: { "aria-label": item },
    sx: { ...colorProps(COLORS[item]) },
  });

  const colorProps = (color: string) => ({
    color,
    padding: "4px",
    "&.Mui-checked": {
      color,
    },
  });

  React.useEffect(() => {
    console.log("getDerivedStateFromProps implementation");
    setSelectedColor(color);
  }, [color]);

  const getTrimmedContent = (content: string) => {
    const trimmed = content.replace(/\s+/g, " ").trim();
    return trimmed.length > 60
      ? `${trimmed.slice(0, 60)}...`
      : trimmed.slice(0, 60);
  };

  return (
    <Card
      sx={{
        boxShadow: "2px 2px 8px 2px grey",
        width: 210,
        minWidth: 210,
        margin: "10px",
        height: 170,
        background: COLORS[selectedColor],
        color: fontColor(selectedColor),
      }}
    >
      <CardActions sx={{ padding: 0 }}>
        <span
          style={{
            background: "#696969b5",
            borderRadius: "0 15px 15px 0",
            cursor: "unset",
          }}
        >
          {Object.keys(COLORS).map((colorKey) => (
            <Radio key={colorKey} {...controlProps(colorKey)} />
          ))}
        </span>
        <IconButton
          sx={{
            marginLeft: "auto",
            color: fontColor(selectedColor),
          }}
        >
          <CloseIcon />
        </IconButton>
      </CardActions>
      <Box
        style={{
          height: "calc(100% - 40px)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={() => onClick(noteId)}
      >
        <CardContent sx={{ padding: "0 16px", paddingBottom: "0 !important" }}>
          <Typography variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2">{getTrimmedContent(content)}</Typography>
        </CardContent>
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "0 16px 8px 0",
          }}
        >
          {dateCreated.toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
}
