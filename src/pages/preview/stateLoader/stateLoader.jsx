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
        setState('eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IlZpZXdwb3J0In0sImlzQ2FudmFzIjp0cnVlLCJwcm9wc8Q0YmFja2dyb3VuZCI6IiNmZmYiLCJwYWRkaW5nIjoyMCwid2lkdGgiOjMwfSwiZGlzcGxhedBgLCJjdXN0b20iOnt9LCJoaWRkZW4iOmZhbHNlLCJub2RlcyI6WyJaUTVkem5HeUJCIiwidl9ZbzJ4OVBQxA1BbDNWZVctRGd1IiwiRGdGVzVUa19SeiJdLCJsaW5rZWROxkR7fX0sIlZZdlV6dTNsQTP7APtUZXjvAPfnAI7pAPh0xCI6IldlbGNvbWUgdG8gQnVpbGRlciBGb3RvbGFrdSEiLCJmb250U2l6ZeYBC3PFCiJzbWFsbMRe7gEPxXTuAQtwYXJlbsRn5QGq+QEb9QDoNXlScWVQa04xd/sA6EJ1dHRvbv4A6u0AtiwidmFyaWHlAJVjb250YWluZWTkALZvbG9yIjoicHJpbWFyeSIs6AEhQ2xpY2sgbWXEJGhpbGRy5ADAy3juAQTHGP8BBv8BBuwBBusCNf8B7v8B7v8B7v8B7v8B7v8A6P8A6OQA6OsDEP8B7v8B7v8B7v8B7v8B7v8B7v8BBv8BBn3tBAn6AQZJbWFnZf4BBWhlaWdodCI6NDbxALTGPv8As/8As+wAs+sEr/oAs0PnAXxy/wWL7wWL7wWONfIAzspZ/wDS/wDS6gDSfQ==');
      }, 1000);

      useEffect(()=>{
        actions.setOptions((options) => (options.enabled = false))
      },[])
    
      useEffect(() => {
        handleState();
      }, [state]);
    
  return (
    <div></div>
  )
}

export default StateLoader