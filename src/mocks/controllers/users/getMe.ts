export const getMe = (_req: any, res: any, ctx: any) => {
  return res(
    ctx.status(201),

    ctx.json({
      firstName: "John",
      age: 38,
    })
  );
};
