"use strict";(self.webpackChunknetomi_docs=self.webpackChunknetomi_docs||[]).push([["346"],{60403(e,n,t){t.r(n),t.d(n,{metadata:()=>s,default:()=>p,frontMatter:()=>a,contentTitle:()=>c,toc:()=>d,assets:()=>l});var s=JSON.parse('{"id":"getting-started/quickstart","title":"Quickstart","description":"Get up and running with the Netomi API in under 5 minutes.","source":"@site/docs/02-getting-started/quickstart.mdx","sourceDirName":"02-getting-started","slug":"/getting-started/quickstart","permalink":"/docs/next/getting-started/quickstart","draft":false,"unlisted":false,"editUrl":"https://github.com/HaresshTechWr/assessment-net/tree/main/docs/02-getting-started/quickstart.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"quickstart","title":"Quickstart","sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"About Netomi","permalink":"/docs/next/introduction"},"next":{"title":"Authentication","permalink":"/docs/next/getting-started/authentication"}}'),r=t(74848),i=t(28453),o=t(9526);let a={id:"quickstart",title:"Quickstart",sidebar_position:1},c="Quickstart",l={},d=[{value:"Step 1: Get your API key",id:"step-1-get-your-api-key",level:2},{value:"Step 2: Send your first message",id:"step-2-send-your-first-message",level:2},{value:"Step 3: Process the response in Python",id:"step-3-process-the-response-in-python",level:2},{value:"Step 4: Continue the conversation",id:"step-4-continue-the-conversation",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function u(e){let n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"quickstart",children:"Quickstart"})}),"\n",(0,r.jsx)(n.p,{children:"Get up and running with the Netomi API in under 5 minutes."}),"\n",(0,r.jsx)(n.h2,{id:"step-1-get-your-api-key",children:"Step 1: Get your API key"}),"\n",(0,r.jsxs)(n.p,{children:["Log in to your Netomi dashboard and navigate to ",(0,r.jsx)(n.strong,{children:"Settings \u2192 API Keys"}),". Copy your key \u2014 you will use it in every request."]}),"\n",(0,r.jsx)(n.h2,{id:"step-2-send-your-first-message",children:"Step 2: Send your first message"}),"\n",(0,r.jsxs)(n.p,{children:["Use the ",(0,r.jsx)(n.code,{children:"/v1/conversations"})," endpoint to start a conversation with an AI agent."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'curl -X POST https://api.netomi.com/v1/conversations \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "agent_id": "agent_abc123",\n    "message": "I need help tracking my order",\n    "user_id": "user_001"\n  }\'\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Example response:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "conversation_id": "conv_xyz789",\n  "status": "active",\n  "reply": {\n    "text": "Sure! Please share your order number and I\'ll look that up for you.",\n    "confidence": 0.97\n  }\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"step-3-process-the-response-in-python",children:"Step 3: Process the response in Python"}),"\n",(0,r.jsxs)(n.p,{children:["The snippet below parses the API response, checks the confidence score, and prints a conversation thread \u2014 exactly what you would do in a real integration. Click ",(0,r.jsx)(n.strong,{children:"\u25B6 Run"})," to execute it live in your browser."]}),"\n",(0,r.jsx)(o.default,{fallback:(0,r.jsx)(n.div,{style:{padding:"1rem",color:"var(--ifm-color-emphasis-600)"},children:"Loading Python runtime\u2026"}),children:()=>{let e=t(63676).A,n=`import json

# Simulated Netomi API response (same shape as the real endpoint)
response = {
  "conversation_id": "conv_xyz789",
  "status": "active",
  "agent_id": "agent_abc123",
  "user_id": "user_001",
  "reply": {
      "text": "Sure! Please share your order number and I'll look that up for you.",
      "confidence": 0.97,
  },
  "created_at": "2025-01-15T10:30:00Z",
}

# \u{2500}\u{2500} Parse and display the response \u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}
print("=== Netomi API Response ===")
print(f"Conversation ID : {response['conversation_id']}")
print(f"Status          : {response['status'].upper()}")
print(f"Agent ID        : {response['agent_id']}")
print(f"User ID         : {response['user_id']}")
print()
reply = response["reply"]
print("Agent Reply:")
print(f'  "{reply["text"]}"')
print(f"  Confidence Score : {reply['confidence'] * 100:.0f}%")

# \u{2500}\u{2500} Confidence threshold check \u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}
THRESHOLD = 0.90
print()
if reply["confidence"] >= THRESHOLD:
  print(f"[PASS] High-confidence reply \u{2014} no human review needed.")
else:
  print(f"[FLAG] Low-confidence reply \u{2014} escalating to a human agent.")

# \u{2500}\u{2500} Simulate a full conversation thread \u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}\u{2500}
messages = [
  {"role": "user",  "text": "I need help tracking my order"},
  {"role": "agent", "text": "Sure! Please share your order number.", "confidence": 0.97},
  {"role": "user",  "text": "My order number is 445566"},
  {"role": "agent", "text": "Your order is out for delivery today!", "confidence": 0.95},
]

print()
print("=== Conversation Thread ===")
for msg in messages:
  role  = msg["role"].upper().ljust(5)
  score = f"  [confidence: {msg['confidence']*100:.0f}%]" if "confidence" in msg else ""
  print(f"{role} | {msg['text']}{score}")
`;return(0,r.jsx)(e,{code:n})}}),"\n",(0,r.jsx)(n.h2,{id:"step-4-continue-the-conversation",children:"Step 4: Continue the conversation"}),"\n",(0,r.jsxs)(n.p,{children:["Pass the ",(0,r.jsx)(n.code,{children:"conversation_id"})," to keep the thread going:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'curl -X POST https://api.netomi.com/v1/conversations/conv_xyz789/messages \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "message": "My order number is 445566"\n  }\'\n'})}),"\n",(0,r.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"./authentication",children:"Authentication"})," \u2014 understand token types and expiry"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/sdks/overview",children:"SDK"})," \u2014 use our JavaScript or Python SDK instead of raw HTTP"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/api-reference/overview",children:"API Reference"})," \u2014 full list of endpoints"]}),"\n"]})]})}function p(e={}){let{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},63676(e,n,t){t.d(n,{A:()=>c});var s=t(74848),r=t(96540),i=t(95613);let o=`# Try it out \u{2014} edit and run any Python code
message = "Hello from Netomi!"
print(message)

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"Sum of {numbers} = {total}")
`;function a({initialCode:e}){let[n,t]=(0,r.useState)(e??o),{runPython:c,stdout:l,stderr:d,isLoading:u,isReady:p,isRunning:h,interruptExecution:m}=(0,i._f)(),g=u?{label:"Loading Python runtime\u2026",cls:"statusLoading_Cf14"}:h?{label:"Running\u2026",cls:"statusRunning_j6LQ"}:{label:"Ready",cls:"statusReady_Yeii"};return(0,s.jsxs)("div",{className:"wrapper_lQpd",children:[(0,s.jsxs)("div",{className:"toolbar_rhC9",children:[(0,s.jsx)("span",{className:"label_VUed",children:"Python 3 Playground"}),(0,s.jsx)("span",{className:`status_jVfw ${g.cls}`,children:g.label})]}),(0,s.jsx)("textarea",{className:"editor_NWdU",value:n,onChange:e=>t(e.target.value),spellCheck:!1,rows:12}),(0,s.jsxs)("div",{className:"actions_PwiR",children:[(0,s.jsx)("button",{className:"btnRun_g0Ma",onClick:function(){c(n)},disabled:!p||h,children:h?"Running\u2026":"\u25B6 Run"}),h&&(0,s.jsx)("button",{className:"btnStop_ySM5",onClick:m,children:"\u25A0 Stop"})]}),(l||d)&&(0,s.jsxs)("div",{className:"output_h0Gt",children:[(0,s.jsx)("div",{className:"outputHeader_iRUq",children:"Output"}),l&&(0,s.jsx)("pre",{className:"stdout_cpXb",children:l}),d&&(0,s.jsx)("pre",{className:"stderr_JmXK",children:d})]})]})}function c({code:e}){return(0,s.jsx)(i.C5,{children:(0,s.jsx)(a,{initialCode:e})})}},28453(e,n,t){t.d(n,{R:()=>o,x:()=>a});var s=t(96540);let r={},i=s.createContext(r);function o(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);