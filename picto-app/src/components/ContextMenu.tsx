import React, { useEffect, useCallback, useMemo } from "react";
import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import { IconType } from "react-icons";
import { AiOutlineUnorderedList, AiOutlineFileText, AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineVideoLibrary, MdOutlineGif, MdOutlineLabel } from "react-icons/md";

interface ContextMenuProps {
  visible: boolean;
  anchorPosition: { x: number; y: number };
  onMenuItemClick: (type: string) => void;
  onClose: () => void;
  onRelocate: (newPosition: { x: number; y: number }) => void;
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
  anchorPosition,
  onMenuItemClick,
  onClose,
  onRelocate,
  isEditMode,
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!isEditMode) handleClose();
  }, [isEditMode, handleClose]);

  // Relocate the context menu when right-clicking elsewhere while it's open
  useEffect(() => {
    const handleRelocate = (e: MouseEvent) => {
      if (visible) {
        e.preventDefault();
        onRelocate({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener("contextmenu", handleRelocate);
    return () => {
      document.removeEventListener("contextmenu", handleRelocate);
    };
  }, [visible, onRelocate]);

  const menuContent = useMemo(
    () =>
      menuItems.map((item, index) =>
        item.type === "divider" ? (
          <Divider key={`divider-${index}`} />
        ) : (
          <MenuItem key={item.type} onClick={() => onMenuItemClick(item.type)}>
            <ListItemIcon>{"icon" in item && <item.icon />}</ListItemIcon>
            {"label" in item && <ListItemText>{item.label}</ListItemText>}
          </MenuItem>
        )
      ),
    [onMenuItemClick]
  );

  if (!visible || !isEditMode) return null;

  return (
    <StyledMenu
      open={visible}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: anchorPosition.y, left: anchorPosition.x }}
    >
      {menuContent}
    </StyledMenu>
  );
};

export default React.memo(ContextMenu);
