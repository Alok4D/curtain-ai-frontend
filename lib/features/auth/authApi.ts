export const useLoginMutation = () => {
  const login = (_data: any) => {
    const promise: any = Promise.resolve({
      success: true,
      data: {
        result: {
          accessToken: "mock_jwt_access_token",
          refreshToken: "mock_jwt_refresh_token",
        },
      },
      message: "Logged in successfully!",
    });
    promise.unwrap = () =>
      Promise.resolve({
        success: true,
        data: {
          result: {
            accessToken: "mock_jwt_access_token",
            refreshToken: "mock_jwt_refresh_token",
          },
        },
        message: "Logged in successfully!",
      });
    return promise;
  };
  return [login, { isLoading: false, error: null }] as const;
};

export const useForgotPasswordMutation = () => {
  const forgotPassword = (_data: any) => {
    const promise: any = Promise.resolve({ data: { success: true } });
    promise.unwrap = () => Promise.resolve({ data: { success: true } });
    return promise;
  };
  return [forgotPassword, { isLoading: false }] as const;
};

export const useResetPasswordMutation = () => {
  const resetPassword = (_data: any) => {
    const promise: any = Promise.resolve({ data: { success: true } });
    promise.unwrap = () => Promise.resolve({ data: { success: true } });
    return promise;
  };
  return [resetPassword, { isLoading: false }] as const;
};
