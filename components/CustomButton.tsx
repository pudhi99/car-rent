"use client";
import { customButtonProps } from "@/types";
import Image from "next/image";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  textStyles,
  rightIcon,
  isDisabled,
  btnType,
}: customButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
