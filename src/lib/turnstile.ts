export async function verifyTurnstile(token:string) {

  const formData = new FormData();

  formData.append(
    "secret",
    process.env.TURNSTILE_SECRET_KEY || ""
  );

  formData.append(
    "response",
    token
  );

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method:"POST",
      body:formData
    }
  );

  const data = await res.json();

  return data.success === true;
}
