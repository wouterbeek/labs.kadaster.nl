const yasgui = new Yasgui(document.getElementById('yasgui'), {
  autofocus: true,
  copyEndpointOnNewTab: false,
  persistenceId: () => "yasgui2", // change this to a different string to bust the yasgui cache for all users
  endpointCatalogueOptions: {
    getData: () => {
      return [
        { endpoint: 'https://api.labs.kadaster.nl/datasets/bag/lv/services/default/sparql' },
        { endpoint: 'https://api.labs.kadaster.nl/datasets/bgt/lv/services/default/sparql' },
        { endpoint: 'https://api.labs.kadaster.nl/datasets/brk/registratie/services/default/sparql' },
        { endpoint: 'https://api.labs.kadaster.nl/datasets/brt/top10nl/services/default/sparql' },
        { endpoint: 'https://api.labs.kadaster.nl/datasets/dst/kkg/services/default/sparql' }
      ]
    }
  },
  requestConfig: {
    endpoint: 'https://api.labs.kadaster.nl/datasets/dst/kkg/services/default/sparql'
  },
  resizeable: true
})
yasgui.addTab(true, {
  id: '3d-gebouw',
  name: '3D gebouw',
  requestConfig: {
    endpoint: 'https://api.labs.kadaster.nl/datasets/kadaster/kg/services/default/sparql'
  },
  yasqe: {
    value: `prefix bag: <http://bag.basisregistraties.overheid.nl/def/bag#>
prefix bgt: <http://bgt.basisregistraties.overheid.nl/def/bgt#>
prefix geo: <http://www.opengis.net/ont/geosparql#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix sor: <https://data.kkg.kadaster.nl/sor/model/def/>
select
  ?brt ('grey' as ?brtColor) ('BRT geometrie: luchtfoto' as ?brtLabel) (0 as ?brtZ) (10 as ?brtHeight)
  ?bag ('red' as ?bagColor) ('BAG geometrie: bovenaanzicht' as ?bagLabel) (10 as ?bagZ) (20 as ?bagHeight)
  ?bgt ('green' as ?bgtColor) ('BGT geometrie: maaiveld' as ?bgtLabel) (20 as ?bgtZ) (30 as ?bgtHeight)
{
  ?gebouw
    geo:hasGeometry
      [ geo:asWKT ?bag; rdfs:isDefinedBy bag: ],
      [ geo:asWKT ?bgt; rdfs:isDefinedBy bgt: ].
  ?nummeraanduiding
    sor:postcode ?postcode.
  ?verblijfsobject
    sor:hoofdadres ?nummeraanduiding;
    sor:maaktDeelUitVan ?gebouw.
  optional {
    ?gebouwzone
      geo:hasGeometry/geo:asWKT ?brt;
      sor:hoortBij ?verblijfsobject.
  }
}
limit 100`
  },
  yasr: {
    settings: {
      selectedPlugin: 'geo3d',
      pluginsConfig: {
        geo3d: {
          map: 'nlmaps'
        }
      }
    }
  }
}).query()
yasgui.addTab(false, {
  id: 'bunkers-in-nl',
  name: 'Bunkers in NL',
  requestConfig: {
    endpoint: 'https://api.labs.kadaster.nl/datasets/brt/top10nl/services/default/sparql'
  },
  yasqe: {
    value: `prefix bif: <http://www.openlinksw.com/schemas/bif#>
prefix geo: <http://www.opengis.net/ont/geosparql#>
prefix brt: <https://brt.basisregistraties.overheid.nl/brt/def/>
prefix typeGebouw: <https://brt.basisregistraties.overheid.nl/brt/id/typeGebouw/>
select ?pointOfInterest ?wgs ('red' as ?wgsColor) {
  ?pointOfInterest
    brt:typeGebouw typeGebouw:bunker;
    brt:geometriePunt|brt:geometrieLijn|brt:geometrieVlak ?rd.
  bind(bif:ST_Transform(?rd, 4326) as ?wgs)
}`
  },
  yasr: {
    settings: {
      selectedPlugin: 'geo',
      pluginsConfig: {
        geo: {
          map: 'nlmaps'
        }
      }
    }
  }
}).query()
yasgui.addTab(false, {
  id: 'taxonomie',
  name: 'Taxonomie',
  requestConfig: {
    endpoint: 'https://api.labs.kadaster.nl/datasets/bgt/lv/services/default/sparql'
  },
  yasqe: {
    value: `prefix bgt: <https://data.labs.kadaster.nl/kadaster/bgt/def/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix skos: <http://www.w3.org/2004/02/skos/core#>
select ?childLabel ?parentLabel {
  [ rdfs:subClassOf ?parent;
    skos:prefLabel ?childLabel ].
  ?parent
    rdfs:subClassOf*/skos:prefLabel ?root;
    skos:prefLabel ?parentLabel.
}`
  },
  yasr: {
    settings: {
      selectedPlugin: 'gchart',
      pluginsConfig: {
        gchart: {
          chartConfig: {
            options: {
              annotations: {
                domain: {
                  style: 'line'
                }
              },
              hAxis: {
                useFormatFromData: true,
                viewWindow: {
                  max: null,
                  min: null
                },
                minValue: null,
                maxValue: null
              },
              legacyScatterChartLabels: true,
              tooltip: {
                isHtml: true,
                ignoreBounds: true
              },
              vAxes: [
                {
                  useFormatFromData: true,
                  viewWindow: {
                    max: null,
                    min: null
                  },
                  minValue: null,
                  maxValue: null
                },
                {
                  useFormatFromData: true,
                  viewWindow: {
                    max: null,
                    min: null
                  },
                  minValue: null,
                  maxValue: null
                }
              ],
              allowCollapse: true,
              booleanRole: 'certainty',
              width: '100%',
              height: '100%'
            },
            state: {},
            view: {
              columns: [
                0,
                {
                  sourceColumn: 1,
                  properties: {
                    role: 'annotation'
                  },
                  label: 'parentLabel'
                }
              ],
              rows: null
            },
            isDefaultVisualization: false,
            chartType: 'OrgChart'
          }
        }
      }
    }
  }
}).query()
yasgui.addTab(false, {
  id: 'federatief',
  name: 'Federatief (Wikidata)',
  requestConfig: {
    endpoint: 'https://api.labs.kadaster.nl/datasets/dst/kkg/services/default/sparql'
  },
  yasqe: {
    value: `prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix wde: <http://www.wikidata.org/entity/>
prefix wdt: <http://www.wikidata.org/prop/direct/>
select * {
  service <https://query.wikidata.org/sparql> {
    ?windfarm
      wdt:P31 wde:Q194356; # windfarm
      wdt:P17 wde:Q55; # Netherlands
      wdt:P625 ?shape;
      rdfs:label ?label.
    optional { ?windfarm wdt:P18 ?image. }
  }
  bind(if(
    bound(?image),
    concat('<figure><img src="',str(?image),'"><figcaption>',str(?label),'</figcaption></figure>'),
    str(?label)) as ?content)
  bind(strdt(concat('<a href="',str(?windfarm),'" target="_blank">',str(?content),'</a>'),rdf:HTML) as ?shapeLabel)
}`
  },
  yasr: {
    settings: {
      selectedPlugin: 'geo',
      pluginsConfig: {
        geo: {
          map: 'nlmaps'
        }
      }
    }
  }
}).query()
