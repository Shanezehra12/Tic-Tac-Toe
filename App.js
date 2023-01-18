import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

const delay = ms => new Promise(res => setTimeout(res, ms));

const App = () => {

const [ Notification, setNotification ] = React.useState("Player X to Start!")
const [ refresh, setRefresh ] = React.useState("false")
const [ board, setBoard ] = React.useState (
    [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " ",
    ])

const [ currentPlayer, setCurrentPlayer ] = React.useState("X")

const pressField = (index) => {
    let newBoard = board
    if (newBoard[index] !== "X" && newBoard[index] !== "O") {

      if (currentPlayer == "X") {
        newBoard[index] ="X"
        setCurrentPlayer("O")
        setNotification("Player O to move")
      }
      else {
        newBoard[index] ="O"
        setCurrentPlayer("X")
        setNotification("Player X to move")
      }    
      setBoard(newBoard)
      setRefresh(!refresh)
      checkIfPlayerWin()
      } 
    }

const checkIfPlayerWin = () => {
    if(board[0] == board[1] && board[1] == board[2] && board[0] != " "){
      PlayerWin(board[0]) // this field 0 is the symbol which win 
    }else if(board[3] == board[4] && board[4] == board[5] && board[5] != " "){
      PlayerWin(board[3])
    }else if(board[6] == board[7] && board[7] == board[8] && board[8] != " "){
      PlayerWin(board[6])
    }else if(board[0] == board[4] && board[4] == board[8] && board[8] != " "){
      PlayerWin(board[0])
    }else if(board[2] == board[4] && board[4] == board[6] && board[6] != " "){
      PlayerWin(board[2])
    }else if(board[0] == board[3] && board[3] == board[6] && board[6] != " "){
      PlayerWin(board[0])
    }else if(board[1] == board[4] && board[4] == board[7] && board[7] != " "){
      PlayerWin(board[1])
    }else if(board[2] == board[5] && board[5] == board[8] && board[8] != " "){
      PlayerWin(board[2])}
  }

const PlayerWin = async (symbol) => {
    setNotification("PLAYER " + symbol + " WIN!")
    await delay (2000)
    setBoard(
      [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " ",
      ])

      if(symbol == "O"){
        setNotification("Player X to move")
      }else{
      setNotification("Player O to move")}
  }

return (
  <SafeAreaView style={styles.container}>
    <Image
    style={styles.background}
    source={require("./Assets/1.jpg")}
    />

    <Text style={styles.text1}> Tic Tac Toe </Text>
    <Text style={styles.text2}> {Notification} </Text>
    
  <View style={styles.flatlistcontainer}>
    <Image
    style={styles.image}
    source={require("./Assets/board.png")}
    />
      <FlatList style={styles.list}
      data= {board}
      numColumns= {3}
      refreshing= {true}
      extraData= {refresh}
      renderItem= {({ item, index }) => 
        <TouchableOpacity style={styles.square} onPress={() => pressField(index)}> 
          <Text style={styles.textz}> {item} </Text>

        </TouchableOpacity>
      }/>
  </View>
      
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },

  flatlistcontainer: {
    justifyContent: "center",
    alignItems:"center",
    height: 300,
    width: "100%"
  },

  text1 : {
    fontSize: 50,
    position: "absolute",
    top: 60
  }, 

  text2 : {
    fontSize: 20,
    position: "absolute",
    top: 130
  }, 

  textz : {
    fontSize: 40,
  },

  list: {
    width: 300, 
    height: 300,
  },

  square: {
    height: 100,
    width: 100, 
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  image : {
    width: 300, 
    height: 300,
    position: "absolute",
  },

  background : {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1
  }
});

export default App;
