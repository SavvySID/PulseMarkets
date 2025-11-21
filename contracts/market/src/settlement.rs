 #[derive(Clone, Debug, Default)]
 pub struct SettlementPlan {
     pub resolver: Option<String>,
 }

 impl SettlementPlan {
     pub fn new(resolver: Option<String>) -> Self {
         Self { resolver }
     }

     pub fn is_ready(&self) -> bool {
         self.resolver.is_some()
     }
 }



