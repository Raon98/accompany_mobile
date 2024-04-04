package acpy.api.support;

import org.apache.commons.collections4.map.ListOrderedMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class LowerKeyMap extends ListOrderedMap {

    @Override
    public Object put(Object key, Object value) {
        if (key instanceof String) {
            key = ((String) key).toLowerCase(); // 문자열을 소문자로 변환
        }
        return super.put(key, value);
    }

    public static HashMap<String, String> convertLowerKeyMap2HashMap(LowerKeyMap lowerKeyMap){
        HashMap<String ,String > resMap = new HashMap<>();
        for(Object key : lowerKeyMap.keyList()){
            resMap.put(key.toString(), lowerKeyMap.get(key).toString());
        }
        return resMap;
    }

    public static List<HashMap<String,String>> convertLowerKeyMap2HashMap(List<LowerKeyMap> lowerKeyMapList){
        List<HashMap<String, String>> resList = new ArrayList<>();
        for(LowerKeyMap lowerKeyMap : lowerKeyMapList){
            resList.add(convertLowerKeyMap2HashMap(lowerKeyMap));
        }
        return resList;
    }
}
