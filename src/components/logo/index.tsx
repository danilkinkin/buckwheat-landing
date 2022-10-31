import styles from "./styles.module.css";
import LogoSVG from "./logo.svg";
import clsx from "clsx";
import { Component, splitProps } from 'solid-js';

export enum LogoType { Full, Title, Icon }
export enum Orientation { Horizontal, Vertical }

type LogoProps = {
    orientation?: Orientation;
    variant?: LogoType;
};

export const Logo: Component<LogoProps> = (props) => {
    const [local] = splitProps(props, ['orientation', 'variant']);
    const variant = local.variant || LogoType.Full;
    const orientation = local.orientation || Orientation.Horizontal;

  return (

    <div class={clsx(styles.logo, orientation === Orientation.Vertical && styles.vertical)} >
        {(variant !== LogoType.Title) && (
            <LogoSVG class={styles.icon} /> 
        )}
        {(variant === LogoType.Icon) && (
            <h1 class={styles.title}>buckwheat</h1>
        )}
    </div>
  );
}

Logo