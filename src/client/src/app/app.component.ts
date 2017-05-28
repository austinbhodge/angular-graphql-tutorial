import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getAllAnimals = gql`
  query{
    getAllAnimals{
      name
    }
  }
`;

interface QueryResponse{
  getAllAnimals
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public animals = [];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<QueryResponse>({
      query: getAllAnimals
    }).subscribe(({data}) => {
      this.animals = data.getAllAnimals;
    });
  }
}
