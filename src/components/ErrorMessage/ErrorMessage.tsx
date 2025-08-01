import React from "react";
import { Text } from "react-native";
import { styles } from "./ErrorMessage.styles";
import { ErrorMessageProps } from "./ErrorMessage.types";

export const ErrorMessage = ({ text }: ErrorMessageProps) => {
  if (text) {
    return <Text style={styles.text}>{text}</Text>;
  }
  return null;
};
