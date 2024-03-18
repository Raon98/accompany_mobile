package com.example.acpy.support;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AcpyMapper {
    private static SqlSessionTemplate sqlSession;

    @Autowired
    public AcpyMapper(SqlSessionTemplate sqlSession) {
        AcpyMapper.sqlSession = sqlSession;
    }

    public static <T> T selectOne(String mapperId, Object paramObj) throws Exception {
        T result = sqlSession.selectOne(mapperId, paramObj);
        return result;
    }

    public static <T> T selectOne(String namespace, String mapperId, Object paramObj) throws Exception {
        String queryId = String.format("%s.%s",namespace,mapperId);
        T result = sqlSession.selectOne(queryId, paramObj);
        return result;
    }

    public static <T> List<T> selectList(String mapperId, Object paramObj) throws Exception {
        List<T> result = sqlSession.selectList(mapperId, paramObj);
        return result;
    }
    public static <T> List<T> selectList(String namespace, String mapperId, Object paramObj) throws Exception {
        String queryId = String.format("%s.%s",namespace,mapperId);
        List<T> result = sqlSession.selectList(queryId, paramObj);
        return result;
    }
    public static int insert(String mapperId, Object paramObj) throws Exception {
        return sqlSession.insert(mapperId, paramObj);
    }
    public static int insert(String namespace, String mapperId, Object paramObj) throws Exception {
        String queryId = String.format("%s.%s",namespace,mapperId);
        return sqlSession.insert(queryId, paramObj);
    }
    public static int update(String mapperId, Object paramObj) throws Exception {
        return sqlSession.update(mapperId, paramObj);
    }
    public static int update(String namespace, String mapperId, Object paramObj) throws Exception {
        String queryId = String.format("%s.%s",namespace,mapperId);
        return sqlSession.update(queryId, paramObj);
    }
    public static int delete(String mapperId, Object paramObj) throws Exception {
        return sqlSession.delete(mapperId, paramObj);
    }
    public static int delete(String namespace, String mapperId, Object paramObj) throws Exception {
        String queryId = String.format("%s.%s",namespace,mapperId);
        return sqlSession.delete(queryId, paramObj);
    }
}
