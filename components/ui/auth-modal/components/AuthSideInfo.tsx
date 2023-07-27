import React from "react";

interface AuthSideInfoProps {
  line1text?: string;
  line2text?: string;
}

const AuthSideInfo: React.FC<AuthSideInfoProps> = ({
  line1text = "Register Now",
  line2text = "Enjoy the 20% off",
}) => {
  return (
    <div>
      <h3 className="text-center text-white font-bold text-2xl">{line1text}</h3>
      <h3 className="text-center text-white font-bold text-2xl">{line2text}</h3>
    </div>
  );
};

export default AuthSideInfo;
