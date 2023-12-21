import { Box, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slice/accountSlice";
import { API_CALL } from "../../helper";
import NotFound from "../PageNotFound";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataAccount = useSelector((state) => {
    return state.accountSlice;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [inUsername, setInUsername] = React.useState("");
  const [inPassword, setInPassword] = React.useState("");

  const onLogin = async () => {
    const response = await API_CALL.post('/account/login', {
        username: inUsername,
        password: inPassword,
    });
    console.log("INI RESPON", response.data.result.token);
    localStorage.setItem("tokenAccount", response.data.result.token);
    dispatch(login(response.data.result));
    if (dataAccount) {
      navigate("/manage-produk");
    } else {
      navigate("*");
    }
  };

  if(dataAccount){
    return (
      <>
        <div style={{ height: "100vh", width: "100vw" }}>
          <Box
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            <Box
              height={"70%"}
              boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
              p={"20px 30px"}
              borderRadius={"20px"}
              width={"30%"}
              display={"flex"}
              justifyContent={"flex-start"}
              flexDirection={"column"}
              gap={"5px"}
            >
              <Text
                marginBottom={"20px"}
                display={"flex"}
                justifyContent={"center"}
                fontWeight={"500"}
                fontSize={"50px"}
              >
                Welcome
              </Text>
              <Text fontWeight={"400"}>Username</Text>
              <Input onChange={(e) => setInUsername(e.target.value)} placeholder="Your Username" type="text" size={"lg"} />
              <Text marginTop={"15px"} fontWeight={"400"}>
                Password
              </Text>
              <InputGroup>
              <Input
                onChange={(e) => setInPassword(e.target.value)}
                size={"lg"}
                placeholder="Your Password"
                type={isVisible ? "text" : "password"}
              />
              <InputRightElement size={"lg"} onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? (
                  <AiFillEyeInvisible style={{marginTop:"8px"}} color="grey" size={"20px"} />
                ) : (
                  <AiFillEye style={{marginTop:"8px"}} color="grey" size={"20px"} />
                )}
              </InputRightElement>
            </InputGroup>
              <Button marginTop={"40px"} colorScheme="facebook" size={"lg"} onClick={onLogin}>
                Login
              </Button>
              <a
                href=""
                style={{
                  fontSize: "12px",
                  width: "28%",
                  color: "rgb(56, 88, 152)",
                }}
              >
                Forgot password?
              </a>
            </Box>
          </Box>
        </div>
      </>
    );
  }else{
    return(
      <>
      <NotFound/>
      </>
    )
  }
};

export default LoginPage;
