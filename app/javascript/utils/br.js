import React from 'react';
export default (text) => {
  return text.split(/\n/).map((item, idx) => <p key={idx} style={{margin: 0, padding: 0}}>{item}</p>)
}