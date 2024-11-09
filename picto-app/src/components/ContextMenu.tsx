import React, { useEffect, useCallback, useMemo } from "react";
import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import { IconType } from "react-icons";
import { AiOutlineUnorderedList, AiOutlineFileText, AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineVideoLibrary, MdOutlineGif, MdOutlineLabel } from "react-icons/md";

interface ContextMenuProps {
  visible: boolean;
  anchorPosition?: { x: number; y: number };
  onMenuItemClick: (type: string) => void;
  onClose: () => void;
  isEditMode: boolean;
}

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    minWidth: 200,
  },
}));

type MenuItemType =
  | {
      type: string;
      icon: IconType;
      label: string;
    }
  | { type: "divider" };

const menuItems: MenuItemType[] = [
  { type: "Form", icon: AiOutlineUnorderedList, label: "Questionnaire" },
  { type: "divider" },
  { type: "Video", icon: MdOutlineVideoLibrary, label: "Vidéo" },
  { type: "Image", icon: AiOutlinePicture, label: "Image" },
  { type: "Gif", icon: MdOutlineGif, label: "GIF" },
  { type: "divider" },
  { type: "Text", icon: AiOutlineFileText, label: "Texte" },
  { type: "Label", icon: MdOutlineLabel, label: "Étiquette" },
  { type: "Hyperlink", icon: AiOutlineLink, label: "Lien" },
];

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  anchorPosition = { x: 0, y: 0 },
  onMenuItemClick,
  onClose,
  isEditMode,
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!isEditMode) handleClose();
  }, [isEditMode, handleClose]);

  const menuContent = useMemo(
    () =>
      menuItems.map((item, index) =>
        item.type === "divider" ? (
          // Divider rendering
          <Divider key={`divider-${index}`} />
        ) : (
          <MenuItem key={item.type} onClick={() => onMenuItemClick(item.type)}>
            <ListItemIcon>
              {/* Only render the icon if it exists in the item */}
              {"icon" in item && <item.icon />}
            </ListItemIcon>
            {/* Only render the label if it exists in the item */}
            {"label" in item && <ListItemText>{item.label}</ListItemText>}
          </MenuItem>
        )
      ),
    [onMenuItemClick]
  );

  const menuPosition = useMemo(() => ({ top: anchorPosition.y, left: anchorPosition.x }), [anchorPosition]);

  if (!visible || !isEditMode) return null;

  return (
    <StyledMenu open={visible} onClose={handleClose} anchorReference="anchorPosition" anchorPosition={menuPosition}>
      {menuContent}
    </StyledMenu>
  );
};

export default React.memo(ContextMenu);
