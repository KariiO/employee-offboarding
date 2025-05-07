import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data['reuseRoute']
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = route.routeConfig?.path;

    if(path) {
      this.routeStore.set(path, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    return !!(
      path && !!route.data['reuseRoute'] && !!this.routeStore.get(path)
    );
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const path = route.routeConfig?.path;

    if (!path) {
      return null
    }

    return this.routeStore.get(path) || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
