package acpy.api.filter;


import acpy.api.config.CorsConfig;

import javax.servlet.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) response;

        res.setHeader("Access-Control-Allow-Origin", CorsConfig.getAllowedOrigins());
        res.setHeader("Access-Control-Allow-Headers", CorsConfig.getAllowedHeaders());
        res.setHeader("Access-Control-Allow-Methods", CorsConfig.getAllowedMethods());
        res.setHeader("Access-Control-Allow-Credentials", String.valueOf(CorsConfig.isAllowCredentials()));

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {}
}
