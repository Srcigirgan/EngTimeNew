import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../Colors';
import { rollcall_history } from '../../../api/rollcall';
import { UserContext } from '../../../context/user';
import moment from 'moment';  // Import moment.js for date formatting and manipulation

const { width, height } = Dimensions.get('window');

const TodoApp = () => {
  const [state, dispatch] = useContext(UserContext);
  const [rollcallHistory, setRollcallHistory] = useState([]);

  useEffect(() => {
    fetchRollcallHistory();
  }, []);

  const fetchRollcallHistory = async () => {
    try {
      const response = await rollcall_history(state?.id);
      const sortedData = (response?.data?.data || []).sort((a, b) => new Date(b.date) - new Date(a.date));
      setRollcallHistory(sortedData);
    } catch (error) {
      console.error('Error fetching rollcall_history:', error);
    }
  };

  const groupRollcallHistory = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.schedule.lesson.name}_${item.date}_${item.schedule.start_time}_${item.schedule.class_fk.name}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          absentStudents: [`${item.user.first_name} ${item.user.last_name}`]
        };
      } else {
        acc[key].absentStudents.push(`${item.user.first_name} ${item.user.last_name}`);
      }
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  const groupedRollcallHistory = groupRollcallHistory(rollcallHistory);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../kuleGray.png')}
        resizeMode='contain'
      />
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../../logoSiyah.png')}
          resizeMode='contain'
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>GEÇMİŞ YOKLAMALARIM</Text>
        {groupedRollcallHistory.length > 0 ? (
          <FlatList
            data={groupedRollcallHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{margin:10}} >
<View style={{borderTopRightRadius:width/30, borderTopLeftRadius:width/30,backgroundColor:Colors.mainYellow,  paddingVertical:8,justifyContent:'center', alignItems:'center' }} >
<Text style={{fontSize:width/30, fontFamily:'Lato-Bold', color:'#000'}} >{item.schedule.lesson.name} - {item.schedule.class_fk.name} - {item.schedule.start_time}</Text>
      </View>
      <View style={{borderBottomRightRadius:width/30, borderBottomLeftRadius:width/30,backgroundColor:'#ddd',  paddingBottom:20,  alignItems:'center', paddingHorizontal:8 }} >
        
<Text style={{fontSize:width/25, fontFamily:'Lato-Bold', color:'#000', marginTop:10}} >Dersin Tarihi: {moment(item.date).format('DD.MM.YYYY')}</Text>
<Text style={{fontSize:width/30, fontFamily:'Lato-Bold', color:'red', marginTop:10}} >GELMEYEN ÖĞRENCİLER</Text>

<Text style={{fontSize:width/25, fontFamily:'Lato-Bold', color:'#000'}} >{item.absentStudents.join('\n')}</Text>

<View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between',width:width/3, marginTop:10}} >
      </View>
      </View>
      </View>
            )}
          />

         

        ) : (
          <Text style={{fontFamily:'Lato-Black', fontSize:18, color:'#000', alignSelf:'center'}} >Henüz hiç yoklama almamışsınız...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: width / 2,
    height: height / 1.1,
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  header: {
    backgroundColor: Colors.mainYellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerImage: {
    width: width / 2,
    height: 85,
    alignSelf: 'center',
    marginTop: 10,
  },
  content: {
    flex: 1,
    margin: 20,
    alignSelf: 'center',
    width: width / 1.1,
  },
  title: {
    fontFamily: 'Lato-Black',
    color: '#000',
    fontSize: width / 18,
    alignSelf: 'center',
    marginBottom: 10,
  },
  rollcallItem: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});

export default TodoApp;
