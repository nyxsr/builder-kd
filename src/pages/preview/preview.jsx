import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import React, { useState } from "react";
import { Text } from "../../components/builder/items/text";
import { Button } from "../../components/builder/items/button";
import { Container } from "../../components/builder/items/container";
import { Card } from "../../components/builder/items/card";
import { CardTop } from "../../components/builder/items/card";
import { CardBottom } from "../../components/builder/items/card";
import { Image } from "../../components/builder/items/image";
import Navbar from "../../components/navbar/navbar";
import LZUTF8 from "lzutf8";
import StateLoader from "./stateLoader/stateLoader";
import { Viewport } from "../../components/builder/base/viewport";

function Preview() {
  return (
    <>
      <Navbar preview={true} />
      <Editor resolver={{ Text, Button, Container, Card, CardTop, CardBottom, Image,Viewport }}>
        <StateLoader />
        <div className="flex justify-center">
          <Frame>
            <Element
              is={Viewport}
              width={30}
              padding={20}
              background="#eee"
              canvas
            ></Element>
          </Frame>
        </div>
      </Editor>
    </>
  );
}

export default Preview;
