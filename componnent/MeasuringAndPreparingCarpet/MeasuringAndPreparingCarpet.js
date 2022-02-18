import React, { useContext, useState } from "react";
import { ImageBackground, View, Text, Button } from "react-native";
import DatePicker from "react-native-datepicker";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { UserContext } from "../../shared/UserContext";
import styles from "./MeasuringAndPreparingCarpetStyle";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MeasuringAndPreparingCarpet() {
  const { user, setUser } = useContext(UserContext);

  const [date, setDate] = useState(new Date());
  const [carpetReception, setCarpetReception] = useState("");
  const [carpetAlredyPrepare, setCarpetAlredyPrepare] = useState(false);
  const [arrayOfCarpet, setArrayOfCarpet] = useState([]);
  const [arrayOfTracks, setArrayOfTracks] = useState([]);
  const [receptionTime, setReceptionTime] = useState("");
  const [numberOfCarpet, setNumberOfCarpet] = useState("");
  const [numberOfTracks, setNumberOfTracks] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientSurname, setClientSurname] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientId, setClientId] = useState("");
  const [carpetId, setCarpetId] = useState({});
  const [trackId, setTrackId] = useState({});

  const [carpetWidth, setCarpetWidth] = useState({});
  const [carpetHeight, setCarpetHeight] = useState([{}]);
  const [price, setPrice] = useState([]);

  const [trackWidth, setTrackWidth] = useState({});
  const [trackHeight, setTrackHeight] = useState([{}]);
  const [trackPrice, setTrackPrice] = useState([]);

  const [carpetSurface, setCarpetSurface] = useState({});
  const [trackSurface, setTrackSurface] = useState({});
  const [forPaymentCarpet, setForPaymentCarpet] = useState({});
  const [forPaymentTrack, setForPaymentTrack] = useState({});
  const [totalPay, setTotalPay] = useState(0);

  function logOutWorker() {
    setUser({
      ...user,
      workerId: null,
      workerName: "",
      workerLogIn: false,
    });
  }

  async function sendData() {
    api(
      `api/carpetReception/getReceptionById/${carpetReception}/${user.userId}`,
      "post",
      {},
      "user"
    )
      .then((res) => {
        if (res.data.prepare === 1) {
          setCarpetAlredyPrepare(true);
          return;
        }

        setCarpetAlredyPrepare(false);

        const carpets = new Array(Number(res.data.numberOfCarpet))
          .fill(0)
          .map((_, index) => [index]);
        setArrayOfCarpet([...carpets]);

        const tracks = new Array(Number(res.data.numberOfTracks))
          .fill(0)
          .map((_, index) => [index]);
        setArrayOfTracks([...tracks]);

        setReceptionTime(res.data.timeAt.split("T")[0]);
        setNumberOfCarpet(res.data.numberOfCarpet);
        setNumberOfTracks(res.data.numberOfTracks);

        api(
          `api/clients/getClientById/${res.data.clientsId}/${user.userId}`,
          "get",
          {},
          "user"
        )
          .then((res) => {
            setClientName(res.data.name);
            setClientSurname(res.data.surname);
            setClientAddress(res.data.address);
            setClientPhone(res.data.phone);
            setClientId(res.data.clientsId);

            api(
              `api/worker/${res.data.workerId}/${user.userId}`,
              "get",
              {},
              "user"
            )
              .then((res) => {
                setWorkerId(res.data.workerId);
                setWorkerName(res.data.name);
              })
              .catch((error) => console.log(error.data));
          })
          .catch((error) => console.log(error.data));
      })
      .catch((error) => console.log(error.data));
  }

  async function sendDataCarpet(index) {
    if (
      carpetWidth[index] === undefined ||
      carpetHeight[index] === undefined ||
      price[index] === undefined
    ) {
      return;
    }

    api(
      `api/carpet/addCarpet/${user.userId}`,
      "post",
      {
        carpetReception: carpetReception,
        width: Number(carpetWidth[index]),
        height: Number(carpetHeight[index]),
        price: Number(price[index]),
        workerId: user.workerId,
        deliveryDate: date.toISOString().split("T")[0],
        clientsId: clientId,
      },
      "user"
    )
      .then((res) => {
        setCarpetId({ carpetId, [index]: res.data.carpetId });
        setForPaymentCarpet({
          ...forPaymentCarpet,
          [index]: res.data.forPayment,
        });

        setTotalPay((prev) => prev + res.data.forPayment);

        setCarpetSurface({
          ...carpetSurface,
          [index]: res.data.width * res.data.heigth,
        });
        api(
          `api/carpetReception/editReception/${user.workerId}/${user.userId}`,
          "post",
          {
            carpetReceptionUser: carpetReception,
            prepare: 1,
          },
          "user"
        );
      })
      .catch((error) => console.log(error));
  }

  function sendDataTrack(index) {
    if (
      trackWidth[index] === undefined ||
      trackHeight[index] === undefined ||
      trackPrice[index] === undefined
    )
      return;

    api(
      `api/carpet/addCarpet/${user.userId}`,
      "post",
      {
        carpetReception: carpetReception,
        width: Number(trackWidth[index]),
        height: Number(trackHeight[index]),
        price: Number(trackPrice[index]),
        workerId: user.workerId,
        deliveryDate: date.toISOString().split("T")[0],
        clientsId: clientId,
      },
      "user"
    ).then((res) => {
      setTrackId({ trackId, [index]: res.data.carpetId });
      setForPaymentTrack({
        ...forPaymentTrack,
        [index]: res.data.forPayment,
      });

      setTotalPay((prev) => prev + res.data.forPayment);

      setTrackSurface({
        ...trackSurface,
        [index]: res.data.width * res.data.heigth,
      });
    });
  }

  function editDataCarpet(index) {
    if (
      carpetWidth[index] === undefined ||
      carpetHeight[index] === undefined ||
      price[index] === undefined
    )
      return;

    api(
      `api/carpet/editCarpet/${carpetId[index]}/${user.userId}`,
      "post",
      {
        carpetReception: carpetReception,
        width: Number(carpetWidth[index]),
        height: Number(carpetHeight[index]),
        price: Number(price[index]),
        workerId: user.workerId,
        deliveryDate: date.toISOString().split("T")[0],
        clientsId: clientId,
      },
      "user"
    ).then((res) => {
      setTotalPay(
        (prev) => prev + res.data.forPayment - forPaymentCarpet[index]
      );

      setForPaymentCarpet({
        ...forPaymentCarpet,
        [index]: res.data.forPayment,
      });

      setCarpetSurface({
        ...carpetSurface,
        [index]: res.data.width * res.data.heigth,
      });
    });
  }

  function editDataTrack(index) {
    if (
      trackWidth[index] === undefined ||
      trackHeight[index] === undefined ||
      trackPrice[index] === undefined
    )
      return;

    api(
      `api/carpet/editCarpet/${trackId[index]}/${user.userId}`,
      "post",
      {
        carpetReception: carpetReception,
        width: Number(trackWidth[index]),
        height: Number(trackHeight[index]),
        price: Number(trackPrice[index]),
        workerId: user.workerId,
        deliveryDate: date.toISOString().split("T")[0],
        clientsId: clientId,
      },
      "user"
    ).then((res) => {
      setTotalPay(
        (prev) => prev + res.data.forPayment - forPaymentTrack[index]
      );

      setForPaymentTrack({
        ...forPaymentTrack,
        [index]: res.data.forPayment,
      });

      setTrackSurface({
        ...trackSurface,
        [index]: res.data.width * res.data.heigth,
      });
    });
  }

  return (
    <ImageBackground
      source={require("../../assets/hero-bg.jpg")}
      style={styles.ImageBackground}
    >
      <View style={styles.darkTheme}>
        <View style={styles.header}>
          <View style={styles.text}>
            <Text style={styles.text}>User: </Text>
            <Text style={styles.textDinamic}>{user.userName}</Text>
          </View>
          <View>
            <Text style={styles.text}>Worker: </Text>
            <Text style={styles.textDinamic}>{user.workerName} </Text>
          </View>
          <View>
            <Button
              title="Log Out Worker"
              color={"#fec400"}
              onPress={() => logOutWorker()}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "#fec400",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Preparing carpets for delivery
          </Text>
        </View>
        <ScrollView>
          <View style={styles.holder}>
            <View style={styles.headerInput}>
              <Text style={{ fontSize: 20, color: "#eee", width: "30%" }}>
                Enter the carpet ID number
              </Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  value={carpetReception}
                  onChangeText={setCarpetReception}
                  keyboardType={"numeric"}
                />
              </View>
              <View
                style={{
                  width: "30%",
                  borderColor: "#793ea5",
                  borderWidth: 2,
                  borderRadius: 20,
                  height: "60%",
                }}
              >
                <Button
                  title="Send"
                  color={"transparent"}
                  onPress={() => sendData()}
                />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Name:
                <Text style={{ color: "#fec400" }}>{clientName}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Surname:
                <Text style={{ color: "#fec400" }}>{clientSurname}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Address:
                <Text style={{ color: "#fec400" }}>{clientAddress}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Phone:
                <Text style={{ color: "#fec400" }}>{clientPhone}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Number of carpets:
                <Text style={{ color: "#fec400" }}>{numberOfCarpet}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Number of tracks:
                <Text style={{ color: "#fec400" }}>{numberOfTracks}</Text>
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Reception time:
                <Text style={{ color: "#fec400" }}>{receptionTime}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>
                Worker:
                <Text style={{ color: "#fec400" }}>{workerName}</Text>
              </Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>Note:</Text>
              <Text style={{ fontSize: 20, color: "#eee" }}>Delivery day:</Text>
              <DatePicker
                name="deliveryDate"
                selected={date}
                onChange={(dateProps) => setDate(dateProps)}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#eee",
                  textAlign: "right",
                }}
              >
                For pay: <Text style={{ color: "#fec400" }}>{totalPay}din</Text>
              </Text>
            </View>
          </View>

          <View style={styles.carpet}>
            {carpetAlredyPrepare ? (
              <Text style={{ color: "#fec400" }}>
                Carpets is alredy prepared
              </Text>
            ) : (
              arrayOfCarpet.map((_, index) => (
                <View key={index} style={styles.carpetInput}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#eee",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Carpet {index + 1}
                  </Text>
                  <View>
                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Width:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          id={index + 1}
                          onChangeText={(e) =>
                            setCarpetWidth({
                              ...carpetWidth,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Height:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          onChangeText={(e) =>
                            setCarpetHeight({
                              ...carpetHeight,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Price:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          onChangeText={(e) =>
                            setPrice({
                              ...price,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 20,
                      }}
                    >
                      <View style={{ width: "30%" }}>
                        <Button
                          title="Send"
                          color="#fec400"
                          onPress={() => sendDataCarpet(index + 1)}
                        />
                      </View>

                      <View style={{ width: "30%" }}>
                        <Button
                          title="Edit"
                          color="#fec400"
                          onPress={() => editDataCarpet(index + 1)}
                        />
                      </View>
                    </View>

                    <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Surface:{carpetSurface[index + 1]}
                      </Text>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        For payment: {forPaymentCarpet[index + 1]}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={styles.carpet}>
            {carpetAlredyPrepare ? (
              <Text style={{ color: "#fec400" }}>
                Tracks is alredy prepared
              </Text>
            ) : (
              arrayOfTracks.map((_, index) => (
                <View key={index} style={styles.carpetInput}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#eee",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Track {index + 1}
                  </Text>
                  <View>
                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Width:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          onChangeText={(e) =>
                            setTrackWidth({
                              ...trackWidth,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Height:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          onChangeText={(e) =>
                            setTrackHeight({
                              ...trackHeight,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.carpetInputRow}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Price:
                      </Text>
                      <View style={styles.carpetInputText}>
                        <TextInput
                          style={styles.textInput}
                          keyboardType={"numeric"}
                          defaultValue={""}
                          onChangeText={(e) =>
                            setTrackPrice({
                              ...trackPrice,
                              [`${index + 1}`]: e,
                            })
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 20,
                      }}
                    >
                      <View style={{ width: "30%" }}>
                        <Button
                          title="Send"
                          color="#fec400"
                          onPress={() => sendDataTrack(index + 1)}
                        />
                      </View>

                      <View style={{ width: "30%" }}>
                        <Button
                          title="Edit"
                          color="#fec400"
                          onPress={() => editDataTrack(index + 1)}
                        />
                      </View>
                    </View>

                    <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        Surface:{trackSurface[index + 1]}
                      </Text>
                      <Text style={{ fontSize: 20, color: "#eee" }}>
                        For payment: {forPaymentTrack[index + 1]}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
