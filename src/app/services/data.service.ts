import { Injectable } from "@angular/core";
import { docData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Activity{
    id?: string;
    title: string;
    adress: string;
    date: string;
    lat: number;
    lng: number;
    participators: string[];
}

@Injectable({
    providedIn: 'root'
})
export class DataService{
    constructor(private firestore: Firestore){}

    getActivities(): Observable<Activity[]>
    {
        const activitiesRef = collection(this.firestore, 'activities');
        return collectionData(activitiesRef, {idField: 'id'}) as Observable<Activity[]>;
    }

    getActivityById(id): Observable<Activity>{
        const activDocRef = doc(this.firestore, 'activities/$(id)');
        return docData(activDocRef, {idField: 'id'}) as Observable<Activity>;
    }

    addActivity(activity: Activity){
        const activityRef = collection(this.firestore, 'activities');
        return addDoc(activityRef, activity);
    }

    deleteActivity(activity: Activity){
        const activDocRef = doc(this.firestore, 'activities/$(activity.id)');
        return deleteDoc(activDocRef);
    }
}