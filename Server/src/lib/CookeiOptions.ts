interface cookieOption {
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
}

const cookieOptionData: cookieOption = {
  maxAge: 1 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false,
};

export default cookieOptionData;
