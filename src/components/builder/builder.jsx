import { Editor, Element, Frame } from "@craftjs/core";
import React, { useEffect, useState } from "react";
import { Settings } from "./panel/settings";
import { Toolbox } from "./panel/toolbox";
import { Text } from "./items/text";
import { Button } from "./items/button";
import { Container } from "./items/container";
import { Card, CardBottom, CardTop } from "./items/card";
import { Topbar } from "./topbar";
import { Viewport } from "./base/viewport";
import { Image } from "./items/image";

function Builder() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Editor
      resolver={{ Text, Button, Container, Card, CardTop, CardBottom, Viewport, Image }}
      enabled={enabled}
    >
      <section className="flex w-full">
        <div className="w-[80%]">
          <Topbar />
          <div className="flex justify-center my-5">
            <Frame>
              <Element
                is={Viewport}
                width={30}
                padding={20}
                background="#fff"
                canvas
              >
                <Text size="small" text="Welcome to Builder Fotolaku!" />
                <Button size="small" variant="contained">
                  Button
                </Button>
              </Element>
            </Frame>
          </div>
        </div>
        <div className="w-[20%]">
          <Toolbox />
          <hr className="w-[80%] mx-auto" />
          <Settings />
        </div>
      </section>
    </Editor>
  );
}

export default Builder;
