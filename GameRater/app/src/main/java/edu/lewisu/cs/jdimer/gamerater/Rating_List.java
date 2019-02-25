package edu.lewisu.cs.jdimer.gamerater;

import java.util.ArrayList;

/**
 * Created by thein on 4/5/2018.
 */

public class Rating_List {
    private static Rating_List instance;
    private ArrayList<Rating_Model> ratingModelList;

    private Rating_List() {
        ratingModelList = new ArrayList<Rating_Model>();
    }

    public static Rating_List Instance()
    {
        if (instance == null)
        {
            instance = new Rating_List();
        }
        return instance;
    }

    public void reset(){
        this.ratingModelList = new ArrayList<Rating_Model>();
    }
    public ArrayList<Rating_Model> getRatingList() {
        return ratingModelList;
    }

    public Rating_Model getRating(int index) {
        return this.ratingModelList.get(index);
    }
    public void saveToDo(int index, Rating_Model model) {
        if (index == -1) {
            this.ratingModelList.add(model);
        } else {
            this.ratingModelList.set(index, model);
        }
    }
}
