export const useCreateUserMutation = () => {
  const createUser = (_data: any) => {
    const res = {
      success: true,
      message: "User registered successfully",
      data: {},
    };
    const promise: any = Promise.resolve(res);
    promise.unwrap = () => Promise.resolve(res);
    return promise;
  };
  return [createUser, { isLoading: false }] as const;
};
