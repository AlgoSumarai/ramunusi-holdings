export function validateQuote(values) {
  const errors = {};
  for (const key of ['name','phone','email','service','area','description']) if (!values[key]?.trim()) errors[key] = 'Please complete this field.';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.phone && !/^\+?[\d\s()-]{7,24}$/.test(values.phone)) errors.phone = 'Enter a valid phone number.';
  return errors;
}
export async function submitQuote(values, endpoint) {
  if (!endpoint) throw new Error('Online enquiries are not available yet. Your details have not been sent. Contact details will be published here once confirmed.');
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values), signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Your enquiry could not be sent. Please try again.');
  return true;
}
