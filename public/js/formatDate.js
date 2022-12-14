function formatDate(createdAt, format) {
  'use strict';
  const date = new Date(createdAt.replace(/-/g, '/'));
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));

  return format;
}
