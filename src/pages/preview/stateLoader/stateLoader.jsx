import { useEditor } from '@craftjs/core';
import LZUTF8 from 'lzutf8';
import React, { useEffect, useState } from 'react'

function StateLoader() {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
      }));
    
      const [state, setState] = useState(null);
    
      const handleState = () => {
        if (state !== null) {
          const json = LZUTF8.decompress(LZUTF8.decodeBase64(state));
          actions.deserialize(json);
        }
      };
    
      setTimeout(() => {
        setState(
          "eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWJhY2tncm91bmQiOiIjZWVlIiwicGFkZGluZyI6MjAsIndpZHRoIjozMH0sImRpc3BsYXnRYSwiY3VzdG9tIjp7fSwiaGlkZGVuIjpmYWxzZSwibm9kZXMiOltdLCJsaW5rZWROxhF7fX0sIkZfbVZqUWoyQU78AMphcmTuAMXHW/cAxmbFAewAyTPyAL3EVO4AuHBhcmVudCI65gFZ/wDI7wDIdi1YQ3pjSFZOX/sAyEJ1dHRvbv4AynNpesQrc21hbGwiLCJ2YXJpYeUAlW91dGxpbmXlALVvbG9yIjoicHJpbWFyeSIsInRleMQkQ2xpY2sgbeQBxGNoaWxkcuQAv8YWxHbuAQLnAI7/AQT/AQTsAQROZmJ3VmJuYlBP+wEEVOQAqv0BAucAzEhpIHdvcmxkISIsImZvbnRT5QEZ5AKS7QEj8QDXxWH/ANX/ANXsANV1WEgwczM1SmlE/wNr/wNr8QKlOTk57AKiNv8DX/8AzvIAziJZSjMtS3dVNzdjIvUA2ssg/wGv/wGv5QGvSXQncyBtZSBhZ2Fpbv8BtP8BtO4A5usBgf8Buu0A4H0="
        );
      }, 1000);
    
      useEffect(() => {
        handleState();
      }, [state]);
    
  return (
    <div></div>
  )
}

export default StateLoader