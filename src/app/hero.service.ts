import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// There are many operators like toPromise that extend Observable with useful capabilities. To use those capabilities, you have to add the operators themselves. That's as easy as importing them from the RxJS library like this:
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';

@Injectable()
export class HeroService {

    private headers = new Headers({ 'content-Type': 'application/json' });
    private heroesUrl = 'api/heroes'; // url to web api
    constructor(private http: Http) { }

    // update a hero 
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    //add new hero to the web api
    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    //delete a hero from web api
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    //get single hero by id from web api
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    //get all heroes from web api
    getHeroes(): Promise<Hero[]> {
        //http.get returns an RxJS Observables are a powerful way to manage asynchronous data flows.
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    };

    //call the getHeroes method just simulate server latency with 2 second delay
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            //simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
