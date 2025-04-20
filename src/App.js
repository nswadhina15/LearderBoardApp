import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native-web';

// Dummy data generator
const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      points: Math.floor(Math.random() * 1000000),
      profile: `https://i.pravatar.cc/150?img=${i}`,
    });
  }
  return users.sort((a, b) => b.points - a.points);
};

const usersData = generateUsers();
const top3 = usersData.slice(0, 3);
const restUsers = usersData.slice(3);

const ITEMS_PER_PAGE = 20;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedUsers(restUsers.slice(start, end));
  }, [currentPage]);

  const renderUser = ({ item, index }) => (
    <View style={styles.userRow}>
      <Text style={styles.rank}>{index + 4 + (currentPage - 1) * ITEMS_PER_PAGE}</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profile }} style={styles.profileImage} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.points}>{item.points.toLocaleString()}</Text>
    </View>
  );

  const renderTop3 = () => (
    <View style={styles.top3Container}>
      {top3.map((user, index) => (
        <View key={user.id} style={styles.topCard}>
          <Text style={styles.topRank}>#{index + 1}</Text>
          <Image source={{ uri: user.profile }} style={styles.topProfileImage} />
          <Text style={styles.topName}>{user.name}</Text>
          <Text style={styles.topPoints}>{user.points.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );

  const renderPagination = () => {
    const totalPages = Math.ceil(restUsers.length / ITEMS_PER_PAGE);
    return (
      <View style={styles.pagination}>
        {[...Array(totalPages)].map((_, i) => (
          <Text
            key={i}
            style={[styles.pageNumber, currentPage === i + 1 && styles.activePage]}
            onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </Text>
        ))}
      </View>
    );
  };

  const renderNavigationTabs = () => (
    <View style={styles.navbarContainer}>
      <Text style={styles.backArrow}>←</Text>
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Party Ranking</Text>
        <Text style={styles.tab}>Live Ranking</Text>
        <Text style={styles.tab}>Hourly Ranking</Text>
        <Text style={styles.tab}>Family Ranking</Text>
        <Text style={styles.helpIcon}>?</Text>
      </View>
      <View style={styles.subTabs}>
        <Text style={[styles.subTab, styles.activeSubTab]}>Weekly Contribution Ranking</Text>
        <Text style={styles.subTab}>Weekly Charm Ranking</Text>
      </View>
    </View>
  );

  return (
    <ScrollView>
      {renderNavigationTabs()}
      {renderTop3()}
      <FlatList
        data={paginatedUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderPagination()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tab: {
    marginRight: 12,
    color: '#aaa',
    fontSize: 14,
  },
  activeTab: {
    color: '#000',
    textDecorationLine: 'underline',
    textDecorationColor: 'yellow',
  },
  helpIcon: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTabs: {
    marginTop: 8,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 4,
  },
  subTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 12,
    color: '#555',
  },
  activeSubTab: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
  },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffe7cf',
  },
  topCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '30%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  topRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9800',
  },
  topProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 8,
  },
  topName: {
    fontSize: 16,
  },
  topPoints: {
    fontSize: 14,
    color: '#555',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  rank: {
    width: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
  },
  points: {
    width: '30%',
    textAlign: 'right',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    flexWrap: 'wrap',
  },
  pageNumber: {
    margin: 4,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    cursor: 'pointer',
  },
  activePage: {
    backgroundColor: '#ff9800',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;