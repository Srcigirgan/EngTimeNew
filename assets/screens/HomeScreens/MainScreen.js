import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Colors from '../../Colors';
import { teacher_anouncement } from '../../../api/anoncement';

const MainScreen = (props) => {
  const { width, height } = Dimensions.get('window');
  
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchAnnouncementDetail();
  }, []);

  const fetchAnnouncementDetail = async () => {
    try {
      const response = await teacher_anouncement();
      if (response && response.data.success) {
        setAnnouncements(response.data.data);
      } else {
        console.log('Response does not have success true or data is not available');
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < announcements.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderAnnouncement = ({ item }) => (
    <View style={styles.announcementContainer}>
      <View style={styles.announcementHeader}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../../logoSiyah.png')}
            resizeMode='contain'
          />
        </View>
        <Text style={styles.announcementFrom}>{item.title}</Text>
      </View>
      <Text style={styles.announcementContent}>{item.content}</Text>
      {item.date && <Text style={styles.announcementDate}>{item.date}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../logoSiyah.png')}
          resizeMode='contain'
          
        />
      </View>
      <View style={styles.announcementWrapper}>
        <Text style={styles.announcementTitle}>Duyurular</Text>
        {loading ? (
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        ) : (
          <>
            <View style={{flexDirection:'row'}} >
            <TouchableOpacity onPress={handlePrevPage} style={{padding:5,alignSelf:'center',margin:5}} >
                          <Text style={{ fontSize:20, color:'#000'}}>{'<'}</Text>
                          </TouchableOpacity>
                                      <FlatList
              data={[announcements[currentPage]]}
              renderItem={renderAnnouncement}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={handleNextPage} style={{padding:5,alignSelf:'center',margin:5}} >
                          <Text style={{ fontSize:20, color:'#000'}}>{'>'}</Text>
                          </TouchableOpacity>
                        </View>

           
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('DersProgramim', { screen: 'DersProgramim' })}
          style={styles.button}>
          <Image
            style={styles.buttonImage}
            source={require('../../checklist.png')}
            resizeMode='contain'
          />
          <Text style={styles.buttonText}>YOKLAMA AL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('Notlarim')}
          style={styles.button}>
          <Image
            style={styles.buttonImage}
            source={require('../../post-it.png')}
            resizeMode='contain'
          />
          <Text style={styles.buttonText}>NOTLARIM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.mainYellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: 85,
    alignSelf: 'center',
    marginTop: 10
  },
  announcementWrapper: {
    marginTop: 20,
    margin: 10,
    backgroundColor: '#fff',
    paddingBottom: 10,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  announcementTitle: {
    fontFamily: 'Lato-Bold',
    color: '#000',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 24
  },
  loadingText: {
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Lato-Medium',
    fontSize: 16,
    marginTop: 20
  },
  announcementContainer: {
    padding: 10,
   
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  avatarContainer: {
    backgroundColor: Colors.mainYellow,
    borderRadius: 50,
    padding: 5,
    borderWidth:1,
    borderColor:'#000'
  },
  avatar: {
    width: 20,
    height: 20
  },
  announcementFrom: {
    color: '#000',
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
    fontSize: 16,

  },
  announcementContent: {
    color: '#000',
    marginLeft: 5,
    fontFamily: 'Lato-Medium',
    fontSize: 12,
    marginTop: 5
  },
  announcementDate: {
    alignSelf: 'center',
    color: '#000',
    marginLeft: 5,
    fontFamily: 'Lato-Medium',
    fontSize: 12,
    marginTop: 10,
    alignSelf:'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  button: {
    backgroundColor: Colors.mainYellow,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    justifyContent: 'center',
    borderRadius: 25,
marginTop: 20
},
buttonImage: {
width: Dimensions.get('window').width / 4.1,
height: Dimensions.get('window').width / 4.1,
alignSelf: 'center',
marginTop: 10
},
buttonText: {
fontFamily: 'Lato-Black',
fontSize: 16,
color: '#000',
marginTop: 10
},
pagination: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginTop: 10,
},
paginationText: {
fontSize: 20,
marginHorizontal: 10,
}
});

export default MainScreen;
   
