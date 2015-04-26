<?php namespace BuildNigeria\Http\Middleware;


use Closure;
use Illuminate\Contracts\Routing\Middleware;

class CorsMiddleware implements Middleware {


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

       return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Access-Token');
    }
}
