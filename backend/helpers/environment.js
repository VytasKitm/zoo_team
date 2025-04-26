export function environment({ lt, aplinka } = {}) {
  const parts = [];
  const params = [];

  if (lt === "true") {
    parts.push("lt = ?");
    params.push(1);
  }
  // else {
  //       parts.push('lt = ?')
  //       params.push(0)
  // }

  if (aplinka) {
    parts.push("aplinka = ?");
    params.push(aplinka);
  }

  if (!parts.length) {
    return { clause: "", params: [] };
  }

  return {
    clause: "WHERE " + parts.join(" AND "),
    params,
  };
}
