import { Flex, Text } from "@chakra-ui/react";
import { PiSmileySadFill } from "react-icons/pi";

const NotFound = () => {
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          height={"45%"}
          width={"100%"}
        >
          <PiSmileySadFill color="rgb(121, 122, 121)" size={"18em"} />
        </Flex>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          width={"100%"}
          height={"30%"}
        >
          <Text fontSize={"10em"} color={"rgb(121, 122, 121)"}>
            404
          </Text>
        </Flex>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          width={"100%"}
          height={"10%"}
        >
          <Text fontSize={"2em"} color={"rgb(205, 206, 204)"}>
            Page not found
          </Text>
        </Flex>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          width={"100%"}
          height={"5%"}
        >
          <Text fontSize={"1em"} color={"grey"}>
            The Page you are looking for doesn't exist or an other error
            occurred
          </Text>
        </Flex>
        <Flex
          display={"flex"}
          justify={"center"}
          align={"center"}
          width={"100%"}
          height={"5%"}
        >
          <Text fontSize={"1em"} color={"grey"}>
            Go back, or head over to tiketo.com to choose a new direction
          </Text>
        </Flex>
      </div>
    </>
  );
};

export default NotFound;
