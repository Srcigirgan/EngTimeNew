import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, BackHandler } from 'react-native';
import FlipCard from 'react-native-flip-card';
import data from '../Data';
import LinearGradient from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const Game = (props) => {
  const { width, height } = Dimensions.get('window');

  const { count, countDk, countSpy, selectedItem } = props.route.params;
  console.log(count, countDk, countSpy)
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Başlangıçta oyuncu 1
  const [spyIndices, setSpyIndices] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timerDuration, setTimerDuration] = useState(countDk * 60);

  useEffect(() => {
    const backAction = () => {
      // Geri tuşuna basıldığında hiçbir işlem yapma
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (selectedItem && selectedItem.content && selectedItem.content.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedItem.content.length);
      setSelectedContent(selectedItem.content[randomIndex]);
    } else {
      console.log('Veri bulunamadı!');
    }

    // Rastgele casus kartlarını belirle
    const tempSpyIndices = [];
    while (tempSpyIndices.length < countSpy) {
      const randomIndex = Math.floor(Math.random() * count);
      if (!tempSpyIndices.includes(randomIndex)) {
        tempSpyIndices.push(randomIndex);
      }
    }
    setSpyIndices(tempSpyIndices);
  }, [count, countSpy, selectedItem]);

  useEffect(() => {
    if (selectedItem && selectedItem.imageTransparent !== undefined) {
      setSelectedImage(selectedItem.imageTransparent);
    } else {
      console.log('Image not found!');
    }
  }, [selectedItem]);

  useEffect(() => {
    setTimerDuration(countDk * 60);
  }, [countDk]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}dk ${seconds}sn`;
  };

  const handleFlipEnd = (isFlipEnd) => {
    if (isFlipEnd) {
      console.log('Yüz bitti');
      if (currentPlayer < count) { // Eğer son oyuncuya kadar gelinmediyse
        setCurrentPlayer(currentPlayer + 1); // Bir sonraki oyuncuya geç
      } else {
        setGameOver(true); // Oyun bittiğinde gameOver durumunu true yap
      }
    }
  };

  const handleReturnHome = () => {
    // Ana ekrana dönme işlemi burada gerçekleştirilebilir
props.navigation.navigate('GameOptions')
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={['#851e21', '#d33338']} >
        {gameOver ? ( // Oyun bittiğinde
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CountdownCircleTimer
              isPlaying
              duration={timerDuration}
              colors={['red', 'red', 'red', 'red']}
            >
              {({ remainingTime }) => <Text style={{ fontFamily: 'Lato-Black', fontSize: width / 12, color: '#fff' }}>{formatTime(remainingTime)}</Text>}
            </CountdownCircleTimer>
            <Text style={{ fontSize: width / 12, fontFamily: 'Lato-Black', color: '#fff', marginTop: 20 }}>KALAN SÜRE</Text>
            <TouchableOpacity onPress={handleReturnHome} style={{ marginTop: 20, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
              <Text style={{ fontFamily: 'Lato-Black', fontSize: 16, color: '#000' }}>Ana Ekrana Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlipCard
            friction={20}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={true}
            clickable={true}
            onFlipEnd={handleFlipEnd}>
            {/* Face Side */}
            <View style={{
              backgroundColor: '#fff', flex: 1, justifyContent: 'space-between', alignItems: 'center', margin: 40, borderRadius: 40, shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
            }}>
              <Text style={{ fontSize: width / 8, fontFamily: 'Lato-Black', marginTop: width / 10, color: '#000' }} >OYUNCU {currentPlayer}</Text>
              <Text style={{ fontSize: width / 8, fontFamily: 'Lato-Black', color: '#000' }} >{spyIndices.includes(currentPlayer - 1) ? 'Sen Ajansın' : selectedContent}</Text>
              <Text style={{ fontSize: width / 20, fontFamily: 'Lato-Light', marginBottom: height / 10, color: '#000' }} >Rolünü gizlemek için dokun ve telefonu sıradaki oyuncuya ver</Text>
              <Image resizeMode='contain' source={selectedImage} style={{ width: width / 2, height: height / 2, position: 'absolute', right: 0, top: height / 6 }} />
            </View>
            {/* Back Side */}
            <View style={{
              backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center', margin: 40, borderRadius: 40, shadowColor: '#000', paddingHorizontal: 40,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
            }}>
              <Text style={{ fontSize: width / 9, textAlign: 'center', color: '#000', fontFamily: 'TopSecret', marginBottom: 30 }} >OYUNCU {currentPlayer}</Text>
              <Text style={{ fontSize: width / 12, textAlign: 'center', color: '#000', fontFamily: 'Lato-Black' }} >ROLÜNÜ GÖRMEK İÇİN KARTA DOKUN</Text>
            </View>
          </FlipCard>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Game;
