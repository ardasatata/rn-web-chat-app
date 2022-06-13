/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  FlatList, Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {GET_ANIME_LIST} from "../query";
import {isDesc, logger} from "../utils"
import {AnimeSortType} from "../query/type";
import {color, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spinner} from "../components/spinner";
import {SearchSection} from "../components/search-section";
import {FilterSection} from "../components/filter-section";
import {CenterText} from "../components/center-text";
import {SearchIcon} from "../assets/svgs";
import {Spacer} from "../components/spacer";
import {AscDescSort} from "../components/asc-desc-sort";

const log = logger().child({module: "AnimeList"})

const PER_PAGE = 10

const AnimeList = ({navigation}: any) => {

  const [anime, setAnime] = useState<Array<any>>();
  const [search, setSearch] = useState<string>('your');
  const [page, setPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<AnimeSortType>(AnimeSortType.popularity)
  const [isSortDesc, setIsSortDesc] = useState<boolean>(true)

  const {loading, error, data} = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: PER_PAGE * page,
      search: search,
      sort: isDesc(activeFilter, isSortDesc)
    }
  });

  const onLoadMore = useCallback(() => {
    !loading && setPage(page + 1)
    log.info(page)
  }, [page, loading])

  useEffect(() => {
    if (data) {
      setAnime(data.Page.media);
    }
    log.info(data)
  }, [data]);

  useEffect(() => {
    setPage(1)
  }, [search]);

  useEffect(() => {
    setPage(1)
  }, [activeFilter]);

  if (loading && anime === undefined) {
    return (
      <Spinner/>
    );
  }

  if (error) {
    return (
      <CenterText text={"Something wrong :("}/>
    );
  }

  return (
    <View style={{flex: 1}}>
      <SearchSection icon={<SearchIcon fill={color.dark900} height={spacing[20]} width={spacing[20]}/>} onChangeText={(value => setSearch(value))}/>
      <FilterSection activeFilter={activeFilter} onFilterPress={setActiveFilter}/>
      {anime ? (
        anime.length !== 0 ? (
          <FlatList
            onEndReached={onLoadMore}
            contentContainerStyle={{}}
            data={anime}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                id: item.id
              })}>
                <HStack left={spacing.medium} vertical={spacing.small}>
                  <Image source={{uri: item.coverImage.large}} style={{
                    height: spacing[72],
                    width: spacing[72],
                  }}/>
                  <VStack left={spacing.medium}>
                    <Text numberOfLines={1} type={'body'} style={{color: color.dark900}}>{item.title.romaji}</Text>
                    <Text style={{color: color.primary900, fontSize: spacing[12]}}>{item.title.native}</Text>
                    <HStack top={spacing.tiny}>
                      <Text style={{fontWeight: 'bold', fontSize: spacing[12]}}>{item.type}</Text>
                      <Spacer width={spacing.medium}/>
                      {/*<ThumbsUp fill={color.dark800} height={spacing[16]} width={spacing[16]} />*/}
                    </HStack>
                    <HStack>
                      {item.tags.map((item, index)=>{
                        if (index > 2) return null
                        return(
                          <Text style={{fontSize: spacing[12]}}>{` ${item.name}, `}</Text>
                        )
                      })}
                    </HStack>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <>
                {loading ? <Spinner/> : null}
              </>
            )}
            ListHeaderComponent={()=> (
              <HStack horizontal={spacing.medium} bottom={spacing.small}>
                <AscDescSort isDesc={isSortDesc} onTogglePress={setIsSortDesc} />
              </HStack>
            )}
          />
        ) : (
          <CenterText text={"No Data Found :("}/>
        )
      ) : (
        <View style={styles.loadContainer}>
          <Spinner/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimeList;
