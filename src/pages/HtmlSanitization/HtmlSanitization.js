import { sanitize } from 'dompurify'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Editor = styled.textarea`
  width: 50%;
  height: 200px;
`

const htmlSanitize = (html) => {
  // Convert the looping tag before <tr>
  // E.g. {{#InvoiceItems}}<tr> => <tr type="TEMPLATE_PLACE_HOLDER" value="{{#InvoiceItem}}"/><tr>
  let parsedHtml = html.replace(
    /{{[^{}]+}}(?=[\n\s]*<tr)/g,
    '<tr template-tag="$&"></tr>'
  )

  // Convert the looping tag after </tr>
  // E.g. </tr>{{/InvoiceItems}} => </tr><tr type="TEMPLATE_PLACE_HOLDER" value="{{/InvoiceItem}}"/>
  parsedHtml = parsedHtml.replace(
    /(?<=<\/tr>[\n\s]*){{[^{}]+}}/g,
    '<tr template-tag="$&"></tr>'
  )

  // Sanitize the html.
  const sanitizeResult = sanitize(parsedHtml, {
    ADD_ATTR: ['template-tag'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|tel|mailto|callto|cid|xmpp|sms):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    FORCE_BODY: true
  })

  // Convert back the looping tags
  const result = sanitizeResult.replace(
    /<tr template-tag="{{[^{}]+}}"><\/tr>/g,
    (match) => match.slice(18, -7)
  )

  return result
}

export function HtmlSanitization() {
  const [html, setHtml] = useState(`<h1>HtmlSanitization</h1>
<p>HtmlSanitization</p>
<script>alert('HtmlSanitization')</script>
<style>body { background-color: red; }</style>
<table>
  <tbody>
  {{#InvoiceItems}}
    <tr>
      <td>HtmlSanitization</td>
    </tr>
  {{/InvoiceItems}}
  </tbody>
</table>
`)
  const [result, setResult] = useState('')

  useEffect(() => {
    setResult(htmlSanitize(html))
  }, [html])

  return (
    <div>
      <button onClick={() => setResult(htmlSanitize(html))} type="button">Sanitize</button>
      <Container>
        <Editor value={html} onChange={(e) => setHtml(e.target.value)} />
        <Editor value={result} readOnly />
      </Container>
    </div>
  )
}
